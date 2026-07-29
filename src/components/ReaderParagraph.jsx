// src/components/ReaderParagraph.jsx
import React, { memo } from 'react';
import { View } from 'react-native';
import Card from './Card';
import MyText from './MyText';
import ReaderAudioButton from './ReaderAudioButton';
import ReaderMeaning from './ReaderMeaning';
import ReaderTransliteration from './ReaderTransliteration';
import { resolveAudioData } from '../utils/readerUtils';

/**
 * ReaderParagraph
 * Renders paragraph blocks following the new Stothram JSON Schema.
 * Uses `text` array instead of legacy `lines`.
 */
const ReaderParagraph = memo(({ item, globalAudio, fontFamily, font, currentLanguage }) => {
  const lines = item.text || item.lines || [];
  const lineGap = fontFamily === 'brhknde' ? 17 : 14;
  const fontSize = fontFamily === 'brhknde' ? parseInt(font) + 2 : parseInt(font);

  // Determine lines to display based on current selected language
  const primaryText = item.text || item.lines || [];
  const transliteratedText = item.transliterations?.[currentLanguage]?.text;
  
  // If currentLanguage is a transliteration language and has transliterated text, display only that
  const isTransliterationSelected = currentLanguage !== 'kn' && Array.isArray(transliteratedText) && transliteratedText.length > 0;
  const renderLines = isTransliterationSelected ? transliteratedText : primaryText;

  // Effective Audio URL calculation
  const audioData = resolveAudioData(globalAudio, item.audio);

  return (
    <Card disableRipple={true}>
      {renderLines.map((line, index) =>
        line?.trim() ? (
          <MyText
            key={index}
            ellipsizeMode="none"
            style={{
              ...(fontFamily && { fontFamily }),
              lineHeight: fontSize + lineGap,
              fontSize: fontSize,
            }}
          >
            {line}
          </MyText>
        ) : (
          <MyText key={`gap-${index}`} style={{ height: 8 }} />
        ),
      )}

      {/* Render Meaning placeholder */}
      {item.meanings && (
        <ReaderMeaning meanings={item.meanings} language={currentLanguage} />
      )}

      {/* Render Audio placeholder button */}
      <ReaderAudioButton
        audioUrl={audioData.url}
        start={audioData.start}
        end={audioData.end}
      />
    </Card>
  );

});

export default ReaderParagraph;
