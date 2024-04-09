import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiPinterest,
  SiX,
  SiYoutube,
} from '@icons-pack/react-simple-icons';

import { FragmentOf, graphql } from '~/client/graphql';
import { Link } from '~/components/link';

const socialIconNames = [
  'Facebook',
  'Twitter',
  'X',
  'Pinterest',
  'Instagram',
  'LinkedIn',
  'YouTube',
];

const SocialIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'Facebook':
      return (
        <SiFacebook
          title="Facebook"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      );

    case 'Twitter':
    case 'X':
      return <SiX title="X" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />;

    case 'Pinterest':
      return (
        <SiPinterest
          title="Pinterest"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      );

    case 'Instagram':
      return (
        <SiInstagram
          title="Instagram"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      );

    case 'LinkedIn':
      return (
        <SiLinkedin
          title="LinkedIn"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      );

    case 'YouTube':
      return (
        <SiYoutube
          title="YouTube"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      );

    default:
      return null;
  }
};

export const SocialIconsFragment = graphql(`
  fragment SocialIconsFragment on Settings {
    socialMediaLinks {
      name
      url
    }
  }
`);

interface Props {
  data: FragmentOf<typeof SocialIconsFragment>;
}

export const SocialIcons = ({ data }: Props) => {
  const socialMediaLinks = data.socialMediaLinks;

  if (socialMediaLinks.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Social media links" className="block">
      <ul className="flex gap-6">
        {socialMediaLinks.map((link) => {
          if (!socialIconNames.includes(link.name)) {
            return null;
          }

          return (
            <li key={link.name}>
              <Link className="inline-block" href={link.url}>
                <SocialIcon name={link.name} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
