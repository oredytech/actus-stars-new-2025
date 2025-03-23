
import React from 'react';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <div className="section-bar mb-4">
      <div className="section-title">
        {title}
      </div>
    </div>
  );
};

export default SectionTitle;
