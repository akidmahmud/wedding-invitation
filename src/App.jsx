import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import emailjs from "emailjs-com";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const formRef = useRef();

  useEffect(() => {
    try {
      emailjs.init("F7TEOYt9235LinUNs"); // Replace with your actual EmailJS public key
      console.log("EmailJS initialized successfully");
    } catch (error) {
      console.error("Failed to initialize EmailJS:", error);
    }
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    // Log form data for debugging
    const formData = new FormData(formRef.current);
    console.log("Form Data:", {
      user_name: formData.get("user_name"),
      attendance: formData.get("attendance"),
    });

    emailjs
      .sendForm(
        "service_7gpll12", // Replace with your actual Service ID
        "template_ihqtndp", // Replace with your actual Template ID
        formRef.current
      )
      .then(
        (result) => {
          console.log("EmailJS Success:", result.text);
          alert("RSVP sent successfully!");
          formRef.current.reset(); // Clear form after success
        },
        (error) => {
          console.error("EmailJS Error:", error.text);
          alert(
            "Failed to send RSVP. Error: " +
              error.text +
              ". Please check your EmailJS configuration or try again later."
          );
        }
      );
  };

  useEffect(() => {
    const items = Array.from(document.querySelectorAll(".dress-item"));
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target);
            entry.target.style.transitionDelay = `${Math.min(idx, 10) * 100}ms`;
            entry.target.classList.add("animate-slide-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const targetDate = new Date("2025-11-01T00:00:00"); // 1st Nov 2025 midnight

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="great-vibes-regular  text-gray-800">
      {/* Hero */}
      <section className="relative flex items-center justify-center min-h-screen bg-[#242831] text-white">
        <div className="text-center px-4">
          {/* Top Image */}
          <div className="flex justify-center mb-6">
            <img
              src="src\assets\intro.png" // change to your decorative image
              alt="Top Decoration"
              className="w-24 sm:w-32 md:w-40 h-auto "
            />
          </div>

          {/* Names */}
          <h1 className="cormorant-garamond text-white text-3xl sm:text-4xl md:text-5xl font-light italic mb-2">
            THE WEDDING RECEPTION <br />
            OF
          </h1>

          <h1 className="dancing-script-five-hundred text-[#D7A244] text-3xl sm:text-4xl md:text-5xl font-light italic mb-2">
            TANJIM & TAUFI
          </h1>

          {/* Date */}
          <p className="text-sm sm:text-base md:text-lg mb-6">
            Saturday 1st November 2025
          </p>

          {/* Image Frame */}
          <div className="relative inline-block rounded-xl overflow-hidden shadow-lg border-2 border-gray-300">
            <img
              src="src/assets/wed_img_1.png"
              alt="Couple"
              className="w-[280px] sm:w-[380px] md:w-[460px] h-auto object-cover"
            />
          </div>

          {/* Scroll Down */}
          <p className="mt-6 text-sm sm:text-base opacity-80">Scroll down</p>
          <div className="animate-bounce mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Couple */}
      <section className="py-12 sm:py-20 text-center bg-[#242831] text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="great-vibes-regular text-2xl sm:text-3xl font-bold mb-10">
            Dear Friends and Family
          </h2>
          <div className="bg-[#FFFFE4] cormorant-garamond text-gray-800 p-6 sm:p-10 rounded-2xl shadow-lg relative overflow-hidden">
            {/* Decorative Image in top-left behind content */}
            <img
              src="src/assets/img 3.jpg"
              alt="Decoration"
              className="absolute bottom-0 right-0 w-24 sm:w-32 opacity-30 pointer-events-none z-0"
            />
            <p className="mb-4 text-lg sm:text-base relative z-10">
              This autumn, a very special and happy event is going to happen our
              wedding reception!
            </p>
            <p className="text-lg sm:text-base relative z-10">
              We can’t imagine this day without our closest people. So, we’re
              very excited to invite you to join and share this wonderful day
              with us.
            </p>

            {/* Decorative Image in top-left behind content */}
            <img
              src="src/assets/img2.jpg"
              alt="Decoration"
              className="absolute top-0 left-0 w-24 sm:w-32 opacity-30 pointer-events-none z-0"
            />
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-10 sm:py-16 bg-[#242831] text-center">
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
          <img
            src="src/assets/img.jpg"
            alt="Countdown Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-800/60" />
          <div className="relative z-10 py-8 sm:py-12 px-4 sm:px-6 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Counting Days
            </h2>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-lg sm:text-xl mb-6 sm:mb-8">
              <div>
                <span className="block text-3xl sm:text-4xl md:text-5xl font-bold">
                  {timeLeft.days}
                </span>
                Days
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl md:text-5xl font-bold">
                  {timeLeft.hours}
                </span>
                Hours
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl md:text-5xl font-bold">
                  {timeLeft.minutes}
                </span>
                Minutes
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl md:text-5xl font-bold">
                  {timeLeft.seconds}
                </span>
                Seconds
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Location */}
      <section className="py-10 sm:py-16 bg-[#242831] text-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
          {/* Left Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="src/assets/img4.jpg"
              alt="Couple"
              className="w-full h-48 sm:h-full object-cover"
            />
          </div>

          {/* Middle Section with Map */}
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-2xl overflow-hidden shadow-lg mb-4 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.1245766227285!2d90.3963546!3d23.7785778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c778f62b7c97%3A0xba563369a980afb2!2sSKS%20Convention%20Hall!5e0!3m2!1sen!2sbd!4v1758478852406!5m2!1sen!2sbd"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-48 sm:h-72"
              ></iframe>
            </div>
            <p className="mt-4 text-base sm:text-lg font-medium text-white">
              SKS Convention Hall (9th Floor)
              <br />
              Sena Gaurab
            </p>
            <a
              href="https://maps.app.goo.gl/sffeT4aJYZpuGszz9" // ✅ Use Google Maps share link here
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-4 sm:px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Get Direction
            </a>
          </div>

          {/* Right Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="src/assets/img5.jpg"
              alt="Couple"
              className="w-full h-48 sm:h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Event Timeline */}
      <section className="py-16 bg-[#242831] text-white">
        <div className="max-w-3xl mx-auto px-4">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
            <img
              src="src\assets\wed_img_2.png"
              alt="Couple Event"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Card */}
          <div className="relative bg-[#FFFFE4] text-gray-800 rounded-2xl shadow-lg p-6 sm:p-10 overflow-hidden">
            {/* Decorative Image in top-left behind content */}
            <img
              src="src/assets/img2.jpg"
              alt="Decoration"
              className="absolute top-0 left-0 w-24 sm:w-32 opacity-30 pointer-events-none z-0"
            />

            <img
              src="src/assets/img 3.jpg"
              alt="Decoration"
              className="absolute bottom-0 right-0 w-24 sm:w-32 opacity-30 pointer-events-none z-0"
            />

            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 relative z-10">
              Event Timeline
            </h2>

            {/* Event Day */}
            <div className="relative z-10">
              <p className="font-semibold mb-3">01.11.2025</p>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>
                  <strong>7:30</strong> – Arrival & Mingling
                </li>
                <li>
                  <strong>8:00</strong> – Bride & Groom Entry
                </li>
                <li>
                  <strong>8:30</strong> – Dinner will be served
                </li>
                <li>
                  <strong>10:00</strong> – Group Photography
                </li>
                <li>
                  <strong>11:00</strong> – Closing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dress Code */}
      <section className="py-10 sm:py-16 bg-[#242831] text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
          Dress Code
        </h2>
        <p className="max-w-xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base text-white">
          We would appreciate it if your attire reflects our wedding theme
          colors, though it is not mandatory.
        </p>
        <div className="mb-8 sm:mb-10 px-4">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={12}
            loop={true}
            autoplay={{ delay: 1800, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 3 },
              640: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="max-w-xl mx-auto"
          >
            {[
              "#000101",
              "#0e1339",
              "#fbc1cd",
              "#f6f6f4",
              "#fffcd0",
              "#033121",
            ].map((color, i) => (
              <SwiperSlide key={i} className="flex justify-center">
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "src/assets/dress 1.png",
              "src/assets/dress2.png",
              "src/assets/dress3.png",
              "src/assets/dress4.png",
              "src/assets/dress 5.png",
              "src/assets/dress6.png",
            ].map((src, i) => (
              <div
                key={i}
                className="dress-item overflow-hidden rounded-2xl shadow-md transform opacity-0"
              >
                <img
                  src={src}
                  alt={`Dress inspiration ${i + 1}`}
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-12 sm:py-16 bg-[#242831] flex justify-center">
        <div className="max-w-lg w-full bg-[#FFFFE4] text-gray-800 p-6 sm:p-10 rounded-2xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
            Please confirm your attendance
          </h2>
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="space-y-6 text-sm sm:text-base"
          >
            <div>
              <label className="block mb-2 font-medium">Your name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Enter your name"
                required
                className="w-full p-2 sm:p-3 rounded border border-gray-300"
              />
            </div>
            <div>
              <p className="font-semibold mb-2">Will you come?</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="attendance"
                    value="Yes, I will"
                    required // Add required to ensure one option is selected
                  />
                  Yes, I will
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="attendance"
                    value="Unfortunately, I cannot ☹"
                  />
                  Unfortunately, I cannot ☹
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="attendance"
                    value="I will tell you a bit later"
                  />
                  I will tell you a bit later
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 sm:py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

 {/* Final Footer Section */}
<footer className="py-12 bg-[#242831] text-center relative">
  <p className="great-vibes-regular text-base sm:text-lg italic text-[#d6c5a9] mb-3">
    We warmly invite you to share the joy of the Wedding Reception of
  </p>
  <p className="cormorant-garamond text-xl sm:text-2xl font-semibold text-[#d6c5a9] mb-4">
    Amirul Haque Tanjim With Taufi Hossain
  </p>
  <p className="great-vibes-regular text-base sm:text-lg italic text-[#d6c5a9] mb-3">
    Join us as we celebrate this divinely blessed bond and mark the
    beginning of a beautiful shared journey.
  </p>

  {/* Heart Icon */}
  <div className="flex justify-center mb-6">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8 text-[#d6c5a9]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.098-4.5-4.688-4.5-1.74 0-3.356 1.008-4.312 2.528C11.044 4.758 9.428 3.75 7.688 3.75 5.098 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  </div>

  {/* Center Text instead of Image */}
  <div className="flex justify-center">
    <p className="noto-naskh-arabic-six-hundred text-xl sm:text-2xl text-[#d6c5a9] italic">
      فِي أَمَانِ اللَّهِ
    </p>
  </div>
</footer>
    </div>
  );
}
