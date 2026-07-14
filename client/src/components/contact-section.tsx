import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export default function ContactSection({ embedded = false }: { embedded?: boolean }) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        projectType: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.projectType || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All form fields are required.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className={embedded ? "py-10 bg-gradient-to-br from-primary via-gray-900 to-primary text-white relative overflow-hidden rounded-lg" : "pt-24 pb-16 bg-gradient-to-br from-primary via-gray-900 to-primary text-white relative overflow-hidden"}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className={embedded ? "text-center mb-10" : "text-center mb-20"}>
          <h2 className={embedded ? "text-3xl lg:text-4xl font-bold mb-4 tracking-tight" : "text-5xl lg:text-6xl font-bold mb-6 tracking-tight"}>Let's Create Something Amazing</h2>
          <p className={embedded ? "text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed" : "text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"}>
            Ready to bring your next project to life? I'm always excited to discuss new opportunities and innovative ideas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-6 group">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <a href="mailto:jlurie.12@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-colors duration-300">
                  jlurie.12@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-6 group">
              <div className="w-16 h-16 bg-gradient-to-br from-teal to-teal/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-glow-teal transition-all duration-300 group-hover:scale-110">
                <Linkedin className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-semibold">LinkedIn</h4>
                <a href="http://linkedin.com/in/jlurie" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal transition-colors duration-300">
                  linkedin.com/in/jlurie
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-6 group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow to-yellow/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <MapPin className="text-primary" size={24} />
              </div>
              <div>
                <h4 className="font-semibold">Location</h4>
                <span className="text-gray-300">Los Angeles, California</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="glass-effect p-10 rounded-3xl shadow-2xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-white bg-opacity-10 border-white border-opacity-20 text-white placeholder-gray-300 focus:border-accent"
              />
              
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-white bg-opacity-10 border-white border-opacity-20 text-white placeholder-gray-300 focus:border-accent"
              />
              
              <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
                <SelectTrigger className="bg-white bg-opacity-10 border-white border-opacity-20 text-white focus:border-accent">
                  <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="event">Event Production</SelectItem>
                  <SelectItem value="audio">Audio Engineering</SelectItem>
                  <SelectItem value="content">Content Creation</SelectItem>
                  <SelectItem value="innovation">Digital Innovation</SelectItem>
                </SelectContent>
              </Select>
              
              <Textarea
                rows={4}
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="bg-white bg-opacity-10 border-white border-opacity-20 text-white placeholder-gray-300 focus:border-accent resize-none"
              />
              
              <Button 
                type="submit" 
                disabled={contactMutation.isPending}
                className="w-full bg-gradient-to-r from-accent to-accent/90 text-white py-5 rounded-xl font-semibold text-lg hover:shadow-glow transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:shadow-none"
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
