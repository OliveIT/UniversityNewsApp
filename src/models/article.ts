import { firestore } from 'firebase/app';

export class Article {
    $key: string;
    category: string;
    title: string;
    lowerCaseTitle: string;
    details: string;
    image: string;
    count?: number | null;
    active: true;
    timestamp: firestore.FieldValue;
}
