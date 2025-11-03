import type { Alert } from "~/routes/home";


export default function Alert(props: Alert) {
    return (
        <div className="px-6 py-4 border rounded-md shadow-sm w-96">
            <p className="font-bold">Error en dispositivo #{props.deviceId}</p>
            <p>{props.message} - {props.timestamp}</p>
        </div>
    );
}