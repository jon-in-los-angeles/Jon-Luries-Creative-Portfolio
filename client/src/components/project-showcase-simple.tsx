export default function ProjectShowcaseSimple() {
  return (
    <section id="work" className="py-20 bg-blue-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-black mb-4">Featured Work - SIMPLE VERSION</h2>
        <p className="text-xl text-black">This is a simplified project showcase to test rendering</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2">Project 1</h3>
            <p>Static project card for testing</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2">Project 2</h3>
            <p>Static project card for testing</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2">Project 3</h3>
            <p>Static project card for testing</p>
          </div>
        </div>
      </div>
    </section>
  );
}