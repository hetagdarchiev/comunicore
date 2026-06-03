import { LuFacebook, LuGithub, LuInstagram } from 'react-icons/lu';

const SOCIAL_LINKS = [
  { Icon: LuGithub, href: 'https://github.com', title: 'GitHub' },
  { Icon: LuInstagram, href: 'https://instagram.com', title: 'Instagram' },
  { Icon: LuFacebook, href: 'https://facebook.com', title: 'Facebook' },
];

export function SocialMedia() {
  return (
    <ul className='mt-auto flex justify-center gap-x-4'>
      {SOCIAL_LINKS.map(({ Icon, href, title }) => (
        <li key={title.toLowerCase()}>
          <a
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-80 hover:text-orange-f4 duration-200'
            aria-label={title}
          >
            <Icon
              width={24}
              height={24}
              aria-hidden={true}
              role='link'
              className='size-6'
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
