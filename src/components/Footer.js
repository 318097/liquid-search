import config from "../config";
import { IconWrapper } from "../lib/UI";
import tracker from "../lib/mixpanel";

const { appName, sponser } = config;

const getCopyright = () => `${appName} ©${new Date().getFullYear()}`;

const icons = [
  {
    id: "Facebook",
    href: "https://www.facebook.com/code404.co/",
    type: "facebook",
  },
  {
    id: "Instagram",
    href: "https://www.instagram.com/code404.co/",
    type: "instagram",
  },
  {
    id: "Twitter",
    href: "https://twitter.com/code404_co",
    type: "twitter",
  },
  {
    id: "Linkedin",
    href: "https://www.linkedin.com/company/code404/",
    type: "linkedin",
  },
];

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <footer>
        <p>{getCopyright()}</p>
        <a href={sponser} target="_blank" rel="noreferrer">
          Support
        </a>
        <div className="fcc">
          {icons.map(({ id, type, href }) => (
            <a
              key={id}
              target="_blank"
              rel="noopener noreferrer"
              href={href}
              onClick={() =>
                tracker.track("CLICKED_SOCIAL_ICON", {
                  platform: id,
                })
              }
            >
              <IconWrapper type={type} tooltip={id} radius="lg" />
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
