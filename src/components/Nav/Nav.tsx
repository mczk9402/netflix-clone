import React, { useState } from 'react';
import { useEffect } from 'react';
import './style.scss';

type Props = {
  className?: string;
};

export const Nav: React.VFC<Props> = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleShow = () => setShow(window.scrollY > 100 ? true : false);

    handleShow();
    window.addEventListener('scroll', handleShow);
    return () => window.removeEventListener('scroll', handleShow);
  }, []);

  return (
    <div className={`${show ? 'Nav Nav-black' : 'Nav'}`}>
      <img
        className="Nav-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Avatar"
      />
    </div>
  );
};
