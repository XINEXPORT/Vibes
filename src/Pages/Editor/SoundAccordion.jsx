import './SoundAccordion.css'

const SoundAccordion = ({index, setActiveIndex, hidden}) =>{
    return(
        <section className = "sound-accordion">
        <div className = "accordion-tab" onClick = {() => setActiveIndex(index)}>
            {type}
        </div>
        <div className=""></div>

        </section>
    )
}