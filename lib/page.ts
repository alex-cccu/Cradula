import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import safeDecodeURIComponent from './utils/safeDecodeURIComponent';
import { Page } from '@/globalTypes';
import { notFound } from 'next/navigation';

const pageDirectory = path.join(process.cwd(), 'miscPages');

export const getPageContent = async (slug: string) => {
    try {
        const fullPath = path.join(pageDirectory, safeDecodeURIComponent(slug) + '.md');

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        
        const processedContent = await remark().use(html).process(matterResult.content);
        const contentHtml = processedContent.toString();

        return {
            slug,
            contentHtml,
            title: matterResult.data.title,
        }
    } catch (error) {
        return notFound();
    }
}

export const getAllPages = (): Page[] => {
    const fileNames = fs.readdirSync(pageDirectory);

    const pages = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(pageDirectory, fileName);

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const articleData = matter(fileContents);

        return {
            id,
            title: articleData.data.title,
        };
    });

    return pages;
}