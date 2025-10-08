import { ArticleItem } from "@/globalTypes";
import moment from "moment";

const dateFormat = "MM-DD-YYYY";

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
    }).reverse();
}

export default sortArticles;