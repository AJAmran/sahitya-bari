/**
 * Safely serialize Mongoose documents to POJOs for Next.js Server Components.
 * This ensures that dates and ObjectIDs are serializable.
 */
export function serialize<T>(data: T): T {
    if (!data) return data;
    return JSON.parse(JSON.stringify(data));
}
