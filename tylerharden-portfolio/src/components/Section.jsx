const Section = ({ name, reference, children, card=false, fillWhite=false}) => {
    return (
      <div className={`${fillWhite ? 'bg-white ' : ''}  px-6 pt-6 pb-12`}>
        {/* Card Container */}
        <div ref={reference} className={`${card ? 'bg-white rounded-2xl shadow-md transition-all duration-700 ease-in-out container' : ''} `}>
          {/* Section Header */}
          <div className="pb-6">
            <h1 className="text-4xl font-bold">{name}</h1>
          </div>
          {children}
        </div>
        {/* <div className="pt-6">
          <hr class="my-1 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
        </div> */}
      </div>
    );
  };
  
  export default Section;

//   bg-gray-50 dark:bg-gray-900