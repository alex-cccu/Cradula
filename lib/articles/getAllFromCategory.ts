import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import safeDecodeURIComponent from '../utils/safeDecodeURIComponent';
import sortArticles from './sortArticles';
import { notFound } from 'next/navigation';

import type { ArticleItem, Category } from '@/globalTypes';

const articlesDirectory = path.join(process.cwd(), 'app/articles');

const getAllFromCategory = (category: string, limit?: number): Category | never => {
    try {
        category = safeDecodeURIComponent(category);
        const folderPath = path.join(articlesDirectory, category);
        const fileNames = fs.readdirSync(folderPath);
        console.log(fileNames);

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

        let articles = sortArticles(unsortedArticles);
        if (limit) {
            articles = articles.slice(0, limit);
        }

        return {
            category,
            articles,
        };
    } catch (error) {
        console.error(error);
        return notFound();
    }
};

export default getAllFromCategory;