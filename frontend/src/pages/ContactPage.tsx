import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form after showing success message
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };
  return (
    <>
      {/* Hero Section */}
      <section className='bg-hero-pattern py-16'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='font-serif text-4xl md:text-5xl font-medium text-candledark mb-6'>
            Contact Us
          </h1>
          <p className='text-candlegray max-w-2xl mx-auto'>
            We'd love to hear from you. Reach out with any questions, feedback,
            or wholesale inquiries.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className='py-16 bg-background'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Contact Info */}
            <div>
              <h2 className='font-serif text-3xl font-medium text-candledark mb-8'>
                Get in Touch
              </h2>

              <div className='space-y-6 mb-10'>
                <div className='flex items-start'>
                  <MapPin className='h-6 w-6 text-candleamber mt-1 mr-4' />
                  <div>
                    <h3 className='font-medium text-candledark mb-1'>
                      Our Location
                    </h3>
                    <p className='text-candlegray'>
                      123 Candle Lane
                      <br />
                      Waxville, CA 90210
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <Phone className='h-6 w-6 text-candleamber mt-1 mr-4' />
                  <div>
                    <h3 className='font-medium text-candledark mb-1'>Phone</h3>
                    <p className='text-candlegray'>(555) 123-4567</p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <Mail className='h-6 w-6 text-candleamber mt-1 mr-4' />
                  <div>
                    <h3 className='font-medium text-candledark mb-1'>Email</h3>
                    <p className='text-candlegray'>hello@glowwick.com</p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <Clock className='h-6 w-6 text-candleamber mt-1 mr-4' />
                  <div>
                    <h3 className='font-medium text-candledark mb-1'>Hours</h3>
                    <p className='text-candlegray'>
                      Monday - Friday: 9am - 5pm
                      <br />
                      Saturday: 10am - 4pm
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg border border-border'>
                <h3 className='font-serif text-xl font-medium text-candledark mb-4'>
                  Wholesale Inquiries
                </h3>
                <p className='text-candlegray mb-4'>
                  Interested in carrying GlowWick products in your store? We'd
                  love to partner with you! Please email us at
                  wholesale@glowwick.com or use our contact form to get in
                  touch.
                </p>
                <p className='text-candlegray'>
                  We offer competitive wholesale pricing, custom packaging
                  options, and reliable fulfillment.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className='font-serif text-3xl font-medium text-candledark mb-8'>
                Send Us a Message
              </h2>

              {submitted ? (
                <div className='bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg'>
                  <h3 className='font-medium text-lg mb-2'>Message Sent!</h3>
                  <p>
                    Thank you for reaching out. We'll get back to you as soon as
                    possible.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className='bg-white p-6 rounded-lg border border-border'
                >
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                    <div>
                      <label
                        htmlFor='name'
                        className='block text-candledark text-sm font-medium mb-2'
                      >
                        Your Name
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-candleamber'
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='email'
                        className='block text-candledark text-sm font-medium mb-2'
                      >
                        Your Email
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-candleamber'
                        required
                      />
                    </div>
                  </div>

                  <div className='mb-4'>
                    <label
                      htmlFor='subject'
                      className='block text-candledark text-sm font-medium mb-2'
                    >
                      Subject
                    </label>
                    <select
                      id='subject'
                      name='subject'
                      value={formData.subject}
                      onChange={handleChange}
                      className='w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-candleamber'
                      required
                    >
                      <option value=''>Select a subject</option>
                      <option value='order'>Order Inquiry</option>
                      <option value='product'>Product Question</option>
                      <option value='wholesale'>Wholesale Inquiry</option>
                      <option value='other'>Other</option>
                    </select>
                  </div>

                  <div className='mb-6'>
                    <label
                      htmlFor='message'
                      className='block text-candledark text-sm font-medium mb-2'
                    >
                      Your Message
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className='w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-candleamber'
                      required
                    ></textarea>
                  </div>

                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className={`w-full py-3 bg-candleamber text-white rounded-md hover:bg-candleamber/80 transition-colors cursor-pointer ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-16 bg-candlelight'>
        <div className='container mx-auto px-4'>
          <h2 className='font-serif text-3xl font-medium text-candledark mb-12 text-center'>
            Frequently Asked Questions
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
            <div className='bg-white p-6 rounded-lg border border-border'>
              <h3 className='font-medium text-lg text-candledark mb-3'>
                How long do your candles burn?
              </h3>
              <p className='text-candlegray'>
                Our burn times vary by size: Small (20-30 hours), Medium (40-50
                hours), and Large (60-70 hours). For optimal burn time, we
                recommend burning for no more than 4 hours at a time.
              </p>
            </div>

            <div className='bg-white p-6 rounded-lg border border-border'>
              <h3 className='font-medium text-lg text-candledark mb-3'>
                Do you ship internationally?
              </h3>
              <p className='text-candlegray'>
                Yes, we ship to select international destinations. Shipping
                costs and delivery times vary by location. Please note that
                customers are responsible for any customs fees or duties.
              </p>
            </div>

            <div className='bg-white p-6 rounded-lg border border-border'>
              <h3 className='font-medium text-lg text-candledark mb-3'>
                Are your candles pet-friendly?
              </h3>
              <p className='text-candlegray'>
                Our candles are made with 100% soy wax and cotton wicks, which
                are safer than paraffin alternatives. However, we always
                recommend burning candles in well-ventilated areas and keeping
                them out of reach of pets and children.
              </p>
            </div>

            <div className='bg-white p-6 rounded-lg border border-border'>
              <h3 className='font-medium text-lg text-candledark mb-3'>
                What's your return policy?
              </h3>
              <p className='text-candlegray'>
                We accept returns within 14 days of delivery for unused,
                unopened items in their original packaging. Please contact us
                before initiating a return.
              </p>
            </div>

            <div className='bg-white p-6 rounded-lg border border-border'>
              <h3 className='font-medium text-lg text-candledark mb-3'>
                How should I care for my candle?
              </h3>
              <p className='text-candlegray'>
                For the best experience, trim the wick to 1/4" before each use,
                allow the wax to melt to the edges on the first burn, and keep
                away from drafts. See our Candle Care page for more detailed
                tips.
              </p>
            </div>

            <div className='bg-white p-6 rounded-lg border border-border'>
              <h3 className='font-medium text-lg text-candledark mb-3'>
                Do you offer custom or personalized candles?
              </h3>
              <p className='text-candlegray'>
                Yes, we offer custom labels and fragrances for special events
                like weddings, corporate gifts, or special occasions. Please
                contact us for more information about our custom options and
                minimum order quantities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
