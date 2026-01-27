// Dev.to API integration
const DEV_TO_USERNAME = "wymdev"; // Update with your dev.to username

export interface DevToArticle {
    id: number;
    title: string;
    description: string;
    url: string;
    cover_image: string | null;
    published_at: string;
    reading_time_minutes: number;
    tag_list: string[];
    positive_reactions_count: number;
    comments_count: number;
}

export async function getDevToArticles(): Promise<DevToArticle[]> {
    try {
        const res = await fetch(
            `https://dev.to/api/articles?username=${DEV_TO_USERNAME}&per_page=10`,
            { next: { revalidate: 3600 } }
        );
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}
