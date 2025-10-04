import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import moment from 'moment';
import { remark } from 'remark';
import html from 'remark-html';
import safeDecodeURIComponent from './utils/safeDecodeURIComponent';

import type { ArticleItem, Category } from '@/globalTypes';

const articlesDirectory = path.join(process.cwd(), 'app/articles');

const dateFormat = "MM-DD-YYYY";

const getAllFromCategory = (category: string): Category => {
    const folderPath = path.join(articlesDirectory, category);
    const fileNames = fs.readdirSync(folderPath);

    const unsortedArticles = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(folderPath, fileName);

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const articleData = matter(fileContents);

        return {
            id,
            title: articleData.data.title,
            date: articleData.data.date,
            category: articleData.data.category,
        };
    });

    const articles = sortArticles(unsortedArticles);

    return {
        category,
        articles,
    };
};

const sortArticles = (articles: ArticleItem[]): ArticleItem[] => {
    return articles.sort((a, b) => {
        const dateOne = moment(a.date, dateFormat);
        const dateTwo = moment(b.date, dateFormat);

        if (dateOne.isBefore(dateTwo)) {
            return -1;
        } else if (dateTwo.isAfter(dateOne)) {
            return 1;
        } else { 
            return 0
        }
    });
}

export const getAllArticles = (): Category[] => {
    const folderNames = fs.readdirSync(articlesDirectory).filter(name => {
        const fullPath = path.join(articlesDirectory, name);
        const isDir = fs.statSync(fullPath).isDirectory();
      
        // Exclude folders like [category]
        const isBracketed = /^\[.*\]$/.test(name);
      
        return isDir && !isBracketed;
      });

    return folderNames.map(folder => getAllFromCategory(folder));
}

export const getArticleContent = async ({category, article}: {category: string, article: string}) => {
    const fullPath = path.join(articlesDirectory, `${safeDecodeURIComponent(category)}`, `${safeDecodeURIComponent(article)}.md`);

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        article,
        contentHtml,
        title: matterResult.data.title,
        category: matterResult.data.category,
        date: moment(matterResult.data.date, dateFormat).format("MMMM Do YYYY"),
    }
}