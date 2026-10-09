/**
 * One object with every count, score, and statistic for a text — the "word counter" dashboard.
 * Each field comes from a public function in `./segment`, `./readability`, `./keywords`, or
 * `./vocabulary`; import those directly when you need only a few numbers.
 */
import { keywords } from './keywords.js';
import { readability, readingTime, speakingTime, syllableCount } from './readability.js';
import { paragraphCount, sentences, words } from './segment.js';
import { length } from './unicode.js';
import { lexicalDiversity, simpsonsDiversityIndex, uniqueWordCount, wordFrequencies, wordLengthStats, yulesK, } from './vocabulary.js';
const WHITESPACE = /\s+/gu;
export function textMetrics(text, options = {}) {
    const wordCount = words(text).length;
    const sentenceList = sentences(text);
    const wordsPerSentence = sentenceList.map(sentence => words(sentence).length);
    const syllables = syllableCount(text);
    return {
        characters: length(text),
        charactersWithoutSpaces: length(text.replaceAll(WHITESPACE, '')),
        words: wordCount,
        uniqueWords: uniqueWordCount(text, options),
        sentences: sentenceList.length,
        paragraphs: paragraphCount(text),
        syllables,
        averageSentenceLength: sentenceList.length === 0 ? 0 : wordCount / sentenceList.length,
        averageSyllablesPerWord: wordCount === 0 ? 0 : syllables / wordCount,
        longestSentenceWords: wordsPerSentence.length === 0 ? 0 : Math.max(...wordsPerSentence),
        shortestSentenceWords: wordsPerSentence.length === 0 ? 0 : Math.min(...wordsPerSentence),
        readingTimeSeconds: readingTime(text).seconds,
        speakingTimeSeconds: speakingTime(text).seconds,
        readability: readability(text),
        keywords: keywords(text, { ...options, limit: 10 }),
        keyPhrases: keywords(text, { ...options, length: 2, limit: 10, minOccurrences: 2 }),
        lexicalDiversity: lexicalDiversity(text, options),
        yulesK: yulesK(text, options),
        simpsonsDiversityIndex: simpsonsDiversityIndex(text, options),
        wordLength: wordLengthStats(text),
        mostCommonWords: wordFrequencies(text, options)
            .slice(0, 10)
            .map(entry => entry.word),
    };
}
//# sourceMappingURL=metrics.js.map