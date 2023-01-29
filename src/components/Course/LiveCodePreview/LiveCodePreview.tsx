import React, { FunctionComponent, useEffect, useState } from 'react';

import { LiveProvider } from 'react-live';
import styles from './liveCodePreview.module.scss';
import classNames from 'classnames';
import LiveCodeEditor from './LiveCodeEditor/LiveCodeEditor';
import LiveCodeResult from './LiveCodeResult/LiveCodeResult';
import beautify from 'js-beautify';

interface OwnProps {
  answer: string;
  onCompleted: () => void;
  isCompleted: boolean;
}

type Props = OwnProps;

const LiveCodePreview: FunctionComponent<Props> = ({ answer, onCompleted, isCompleted }) => {
  const [code, setCode] = useState(DEFAULT_CODE);
  useEffect(() => {
    code.replace(' ', '').includes(answer.replace(' ', '')) && onCompleted();
  }, [code]);
  return (
    <LiveProvider code={code} /*transformCode={(code) => beautify.js_beautify(code)}*/>
      <div className={styles.container}>
        <div className={classNames(styles.editorPanel)}>
          <LiveCodeEditor setCode={setCode} />
        </div>
        <div className={classNames(styles.resultPanel, { [styles.success]: isCompleted })}>
          <LiveCodeResult />
        </div>
      </div>
    </LiveProvider>
  );
};

const DEFAULT_CODE = `//React functions are accessible by React prefix, e.g. React.useState
function CodeEditor() { 
  return <div>Hello world</div>
}`;

export default LiveCodePreview;
