import React from 'react';
import Image from 'next/image';
import { Testimonial } from '../data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="testimonial-card">
      <div className="quote-mark" aria-hidden="true">“</div>
      
      <blockquote className="testimonial-quote">
        {testimonial.quote}
      </blockquote>
      
      <div className="testimonial-author-wrap">
        <div className="author-avatar-box">
          <Image
            src={testimonial.image}
            alt={`Photo de ${testimonial.author}`}
            width={58}
            height={58}
            className="author-avatar-img"
          />
        </div>
        <div className="author-meta">
          <span className="author-name">{testimonial.author}</span>
          <span className="author-role">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
}
