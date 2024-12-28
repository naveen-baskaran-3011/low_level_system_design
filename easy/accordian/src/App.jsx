import { useRef, useState } from "react";
import Accordian from "./Accordian";
import './App.css';

const ACCORDIAN_LIST = [
    {
        id: 1,
        heading: 'Do I have to allow the use of cookies?',
        content: 'Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, whatever poutine normcore fixie cred kickstarter post-ironic street art.'
    },
    {
        id: 2,
        heading: 'How do I change my My Page password?',
        content: 'Coloring book forage photo booth gentrify lumbersexual. Migas chillwave poutine synth shoreditch, enamel pin thundercats fashion axe roof party polaroid chartreuse.'
    },
    {
        id: 3,
        heading: 'When do I recieve a password ordered by letter?',
        content: 'Locavore franzen fashion axe live-edge neutra irony synth af tilde shabby chic man braid chillwave waistcoat copper mug messenger bag. Banjo snackwave blog, microdosing thundercats migas vaporware viral lo-fi seitan'
    }
];
export default function App() {
    const [accordianList, setAccordianList] = useState([...ACCORDIAN_LIST]);
    const multipleOpenChBox = useRef(null);

    return <div>
        <div>
            <label htmlFor="mutiple_open">Is multiple open accordion allowed?</label>
            <input type="checkbox" name="mutiple_open" id="mutiple_open" ref={multipleOpenChBox} />
        </div>
        {accordianList.map((acc, index) => <Accordian
            key={acc.id}
            config={acc}
            onClick={() => {
                if(multipleOpenChBox.current.checked) {
                    accordianList[index].show = !accordianList[index].show;
                } else {
                    accordianList.forEach((el) => {
                        if(el.id === acc.id) {
                            el.show = !el.show;
                        } else {
                            el.show = false;
                        }
                    })
                }
                setAccordianList([...accordianList])
            }} />)}
    </div>
}