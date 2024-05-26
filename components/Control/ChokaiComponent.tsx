import React from 'react';
import NumberBox from './NumberBox';
import AudioPlayer from './AudioPlayer';
import { ChokaiComponentProps } from '@/utils/types';

const getHeaderText = (mondai: number): string => {
  switch (mondai) {
    case 1:
      return '問題1 では、まず質問を聞いてください。それから話を聞いて、問題用紙の(1)から(4)の中から、最もよいものをー つ選んでください。';
    case 2:
      return '問題2 では、まず質問を聞いてください。そのあと、問題用紙のせんたくしを読んでください。読む時間があります。それから話を聞いて、問題用紙の(1)から(4)の中から、最もよいものを一つ選んでください。';
    case 3:
      return '問題3 では、問題用紙に何も印刷されていません。この問題は、全体としてどんな内容かを聞く問題です。話の前に質問はありません。まず話を聞いてください。それから、しつもんとせんたくしを聞いて、(1)から(4)の中から、最もよいものを一つ選んでください。';
    case 4:
      return '問題4 では、問題用紙に何も印刷されていません。まず文を聞いてください。それから、それに対する返事を聞いて、(1)から(3)の中から、最もよいものを一つ選んでください。';
    case 5:
      return '問題5 では長めの話を聞きます。この問題には練習はありません。メモをとってもかまいません。';
    default:
      return '問題 未定義';
  }
};

const renderOptions = (chokai: any) => (
  <div className="mx-2">
    <div className="flex flex-wrap justify-between">
      {[1, 2, 3, 4].map((num) => {
        if (num === 4 && chokai.mondai_number === 4) {
          return null;
        }
        return (
          <div key={num} className="flex flex-row mr-4">
            <div className="flex mb-2 px-2 rounded-lg hover:cursor-pointer border">
              <div className="mr-4">{num}</div>
              <div>{chokai[`option_${num}`]}</div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const ChokaiComponent: React.FC<ChokaiComponentProps> = ({ chokais }) => {
  if (chokais.length === 0) {
    return <p>No questions available for this mondai.</p>;
  }
  const mondai_number = chokais[0].mondai_number;

  return (
    <div className="flex flex-col mb-8 md:mt-8">
      <h2 className="mb-4">{getHeaderText(mondai_number)}</h2>
      <div>
        {chokais.map((chokai, index) => (
          <div key={index}>
            <div className="mb-4">
              {mondai_number == 5 && (
                <>
                  {(index === 0 || index === chokais.length - 1) && (
                    <p className="mb-4">
                      {`
                        ${
                          index === 0
                            ? '1 番、' + (chokais.length > 2 ? '2 番、' : '')
                            : `${chokais.length} 番、`
                        }
                        まず話を聞いてください。それから、二つの質問を聞いて、それぞれ問題用紙の(1)から(4)の中から、最もよいものを一つ選んでください。
                      `}
                    </p>
                  )}
                  {index === chokais.length - 1 && (
                    <>
                      <h4 className="mb-2">質問 1</h4>
                      {renderOptions(chokai)}
                      <h4 className="mb-2">質問 2</h4>
                    </>
                  )}
                </>
              )}
              <div className="flex flex-row mb-2">
                <NumberBox number={chokai.question_number} />
                <h3 className="mr-2">番</h3>
                <AudioPlayer
                  src={`https://res.cloudinary.com/dxrsjkj8m/video/upload/v1716523175/asiatips/audio/${chokai.year}-${chokai.month}-${chokai.mondai_number}-${chokai.question_number}.mp3`}
                />
              </div>
              {renderOptions(chokai)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChokaiComponent;
