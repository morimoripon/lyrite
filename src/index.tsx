import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './components/layouts/App';
import { Amplify, Hub } from "aws-amplify";
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import { ConnectionState, CONNECTION_STATE_CHANGE } from '@aws-amplify/pubsub';

// Amplifyの設定を行う
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Authenticator>
    {({ signOut, user }) => (
      <App signOut={signOut} user={user} />
    )}
  </Authenticator>
);
