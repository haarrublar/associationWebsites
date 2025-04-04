import Marquee from "react-fast-marquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faApple,
  faFacebook,
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const PartnersLogos = () => {
  const icons = [faApple, faFacebook, faGithub, faGoogle, faTwitter];

  return (
    <>
        <section className="mx-auto w-full md:max-w-5xl lg:max-w-7xl px-0 md:px-6 lg:px-8 pt-16">
            <div className="text-center">
                <h1 className="text-2xl tracking-tight text-balance sm:text-4xl font-semibold text-gray-900 hover:bg-gray-50">
                    We Partner With
                </h1>
            </div>

            <Marquee pauseOnHover speed={50} gradient={false} autoFill>
                {icons.map((icon, idx) => (
                <div key={idx} className="mx-8 py-12">
                    <FontAwesomeIcon
                    icon={icon}
                    className={`hover:filter-none transition-all duration-300 cursor-pointer text-gray-500`}
                    size="3x"
                    style={{
                        objectFit: "cover", // cover, contain, none
                    }}
                    />
                </div>
                ))}
            </Marquee>
        </section>
    </>
  );
};

export default PartnersLogos;