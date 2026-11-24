import PageOutline from '../components/PageOutline';

/* The member area opens this page after the questionnaire. PageOutline gives
it the shared layout and a way to continue while the challenge UI is being planned*/
export default function Challenges() {
  return <PageOutline title="Challenges" sections={[]} next={{ to: '/dashboard', label: 'Continue to dashboard' }} />;
}
