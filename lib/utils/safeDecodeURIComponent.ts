import path from "path";

const safeDecodeURIComponent = (segment: string): string => {
    if (
        segment !== '' &&
        !segment.includes('..') &&
        !segment.includes('/') &&
        !segment.includes('\\') &&
        !path.isAbsolute(segment)
    ) return decodeURIComponent(segment);

    return ''
}

export default safeDecodeURIComponent;