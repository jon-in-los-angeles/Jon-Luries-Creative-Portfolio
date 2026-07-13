import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function TwelveGrandSection() {
  return (
    <section id="twelve-grand" className="py-20 bg-gray-900 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6">
            <Rocket className="w-4 h-4 text-gray-500" />
            Now Building
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
            Founder &amp; Strategic Lead, 12 Grand LLC
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            12 Grand LLC is a hybrid creative agency and consultancy. Currently, we are spearheading the development of{" "}
            <span className="font-semibold text-gray-900">Connect for Success (C4S)</span>, a behavioral intelligence platform that helps managers and teams communicate better, reducing workplace friction and saving companies time and money.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
