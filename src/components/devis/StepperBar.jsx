const STEPS = ['Secteur', 'Pages', 'Options', 'Contact', 'Devis']

export default function StepperBar({ step, onStepClick }) {
  return (
    <div className="mb-12">
      <div className="flex items-center">
        {STEPS.map((label, i) => {
          const n = i + 1
          const done    = n < step
          const current = n === step
          return (
            <div key={label} className={`flex items-center ${i > 0 ? 'flex-1' : ''}`}>
              {i > 0 && (
                <div className={`flex-1 h-px mx-2 transition-colors duration-300 ${
                  done || current ? 'bg-laiton' : 'bg-brume/30'
                }`} />
              )}
              <button
                type="button"
                onClick={() => done && onStepClick(n)}
                disabled={!done}
                className={`relative flex flex-col items-center group ${done ? 'cursor-pointer' : 'cursor-default'}`}>
                <span className={`w-9 h-9 rounded-full flex items-center justify-center font-util text-xs transition-all duration-300 ${
                  current ? 'bg-minuit text-laiton ring-2 ring-laiton/40'
                  : done  ? 'bg-laiton text-minuit group-hover:bg-laiton/80'
                  :         'bg-white border border-brume/30 text-minuit/35'
                }`}>
                  {done ? (
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : n}
                </span>
                <span className={`absolute top-11 font-util text-[10px] tracking-wider uppercase whitespace-nowrap hidden sm:block ${
                  current ? 'text-minuit font-bold' : done ? 'text-laiton' : 'text-minuit/30'
                }`}>
                  {label}
                </span>
              </button>
            </div>
          )
        })}
      </div>
      {/* Label mobile de l'étape courante */}
      <p className="sm:hidden text-center font-util text-[11px] tracking-widest uppercase text-laiton mt-4">
        Étape {step}/5 — {STEPS[step - 1]}
      </p>
      <div className="hidden sm:block h-6" />
    </div>
  )
}
