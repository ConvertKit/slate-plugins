import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListOl,
  faListUl,
  faIndent,
  faOutdent,
  faQuoteLeft
} from "@fortawesome/free-solid-svg-icons";

export const Icon = ({ icon }) => <FontAwesomeIcon icon={icon} />;

export const OrderedList = () => <Icon icon={faListOl} />;
export const UnorderedList = () => <Icon icon={faListUl} />;
export const Indent = () => <Icon icon={faIndent} />;
export const Outdent = () => <Icon icon={faOutdent} />;
export const Quote = () => <Icon icon={faQuoteLeft} />;
