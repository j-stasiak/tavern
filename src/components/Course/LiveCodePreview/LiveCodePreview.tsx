import React, { FunctionComponent, useState } from 'react';

import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import styles from './liveCodePreview.module.css';
import classNames from 'classnames';
import LiveCodeEditor from './LiveCodeEditor/LiveCodeEditor';
import LiveCodeResult from './LiveCodeResult/LiveCodeResult';

interface OwnProps {
  cosTam?: string;
}

type Props = OwnProps;

const LiveCodePreview: FunctionComponent<Props> = (props) => {
  const [code, setCode] = useState(DEFAULT_CODE);
  return (
    <LiveProvider code={code}>
      <div className={styles.splitScreen}>
        <div className={classNames(styles.editorPane, styles.darkMode)}>
          <LiveCodeEditor setCode={setCode} />
        </div>
        <div className={classNames(styles.resultPane, styles.lightMode)}>
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
