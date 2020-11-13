import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faBtc,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import FontAwesomeIcon from "@/libs/FontAwesomeIcon.vue";

library.add(fas, faTwitter, faInstagram, faEnvelope, faBtc);

export { FontAwesomeIcon };
