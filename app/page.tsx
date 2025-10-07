import { redirect } from 'next/navigation';

export default function RootPage() {
  // 기본적으로 한국어로 리다이렉트
  redirect('/ko');
}
