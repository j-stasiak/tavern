import React, { FunctionComponent } from 'react';
import { LiveError, LivePreview } from 'react-live';

interface OwnProps {
  string?: string;
}

type Props = OwnProps;

const LiveCodeResult: FunctionComponent<Props> = (props) => (
  <>
    <LiveError />
    <LivePreview />
  </>
);

export default LiveCodeResult;
