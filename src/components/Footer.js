import config from "../config";
import { IconWrapper } from "../lib/UI";
import tracker from "../lib/mixpanel";

const { appName, sponser } = config;

const getCopyright = () => `${appName} ©${new Date().getFullYear()}`;

const icons = [
  {
    id: "Facebook",
    href: "https://www.facebook.com/liquidsearch.co/",
    type: "facebook",
  },
  {
    id: "Instagram",
    href: "https://www.instagram.com/liquidsearch.co/",
    type: "instagram",
  },
  {
    id: "Twitter",
    href: "https://twitter.com/liquidsearch_co",
    type: "twitter",
  },
  {
    id: "Linkedin",
    href: "https://www.linkedin.com/company/liquidsearch/",
    type: "linkedin",
  },
  {
    id: "Youtube",
    href: "https://www.youtube.com/@liquidsearch",
    type: "youtube",
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
