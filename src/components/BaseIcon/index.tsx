import React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

const BaseIcon = ({ src, className }: { src: string; className?: string }) => {
  return (
    <img src={src} className={classNames(styles.icon, className)} alt="" />
  );
};

export default BaseIcon;
