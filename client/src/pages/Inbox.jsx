import PageOutline from '../components/PageOutline';

// PageOutline turns these two labels into empty sections for the inbox.
// The first is for the message list and the second is for the message someone opens.
export default function Inbox() {
  return <PageOutline title="Encouragement" sections={['Received messages', 'Message details']} />;
}
