import { title, subtitle } from '@/components/primitives';
import { labels } from './constants';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ color: 'violet' })}>
          {labels.mainTitle}&nbsp;
        </span>
        <br />
        <div className={subtitle({ class: 'mt-3' })}>{labels.subTitle}</div>
      </div>
    </section>
  );
}
