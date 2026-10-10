import React from 'react';
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
        <span className="author-name">{testimonial.author}</span>
        <span className="author-role">{testimonial.role}</span>
      </div>
    </div>
  );
}
