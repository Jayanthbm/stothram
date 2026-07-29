// src/components/ReaderParagraph.jsx
import React, { memo } from 'react';
import { View } from 'react-native';
import Card from './Card';
import MyText from './MyText';
import ReaderAudioButton from './ReaderAudioButton';
import ReaderMeaning from './ReaderMeaning';
import ReaderTransliteration from './ReaderTransliteration';
import { resolveAudioData, resolveMeaningLines } from '../utils/readerUtils';

/**
 * ReaderParagraph
 * Renders paragraph blocks following the new Stothram JSON Schema.
 * Uses `text` array instead of legacy `lines`.
 */
const ReaderParagraph = memo(
  ({
    item,
    globalAudio,
    fontFamily,
    font,
    currentLanguage,
    showMeanings = false,
    meaningLanguage,
  }) => {
    const lines = item.text || item.lines || [];
    const lineGap = fontFamily === 'brhknde' ? 17 : 14;
    const fontSize =
      fontFamily === 'brhknde' ? parseInt(font) + 2 : parseInt(font);

    // Determine lines to display based on current selected language
    const primaryText = item.text || item.lines || [];
    const transliteratedText = item.transliterations?.[currentLanguage]?.text;

    // If currentLanguage is a transliteration language and has transliterated text, display only that
    const isTransliterationSelected =
      currentLanguage !== 'kn' &&
      Array.isArray(transliteratedText) &&
      transliteratedText.length > 0;
    const renderLines = isTransliterationSelected
      ? transliteratedText
      : primaryText;

    // Resolve meanings array with preferred meaningLanguage -> currentLanguage -> defaultLanguage/kn -> any available language
    const meaningLines = resolveMeaningLines(
      item.meanings,
      meaningLanguage || currentLanguage,
    );
    const hasMeaningLines =
      showMeanings && Array.isArray(meaningLines) && meaningLines.length > 0;

    // Effective Audio URL and timestamps calculation
    const audioData = resolveAudioData(globalAudio, item.audio);

    return (
      <Card disableRipple={true}>
        {renderLines.map((line, index) => {
          let meaningForLine = null;
          if (hasMeaningLines) {
            const textCount = renderLines.length;
            const meaningCount = meaningLines.length;

            if (meaningCount >= textCount) {
              meaningForLine = meaningLines[index];
            } else {
              // meaningCount < textCount
              if (index < meaningCount - 1) {
                // 1 to N-1 meanings map 1-to-1 with lines 1 to N-1
                meaningForLine = meaningLines[index];
              } else if (index === textCount - 1) {
                // The last line gets the final N-th meaning
                meaningForLine = meaningLines[meaningCount - 1];
              }
            }
          }

          return line?.trim() ? (
            <View key={index} style={{ marginBottom: 4 }}>
              <MyText
                ellipsizeMode="none"
                style={{
                  ...(fontFamily && { fontFamily }),
                  lineHeight: fontSize + lineGap,
                  fontSize: fontSize,
                }}
              >
                {line}
              </MyText>
              {meaningForLine ? (
                <ReaderMeaning line={meaningForLine} font={font} />
              ) : null}
            </View>
          ) : (
            <MyText key={`gap-${index}`} style={{ height: 8 }} />
          );
        })}

        {/* Render remaining extra meanings if meaningLines count exceeds text lines count */}
        {hasMeaningLines && meaningLines.length > renderLines.length && (
          <ReaderMeaning
            lines={meaningLines.slice(renderLines.length)}
            font={font}
          />
        )}

        {/* Render paragraph audio player when URL is not null or start/end is not 0 */}
        <ReaderAudioButton
          audioUrl={audioData.url}
          start={audioData.start}
          end={audioData.end}
        />
      </Card>
    );
  },
);

export default ReaderParagraph;
