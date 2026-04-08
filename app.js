let vescChar;
const SERVICE_UUID = 0x1234;
const CHAR_UUID = 0x5678;

async function connectBLE() {
    const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'VESC_C3_CONTROLLER' }],
        optionalServices: [SERVICE_UUID]
    });
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(SERVICE_UUID);
    vescChar = await service.getCharacteristic(CHAR_UUID);
    document.getElementById('status').innerText = "CONNECTED";
    document.getElementById('status').classList.add('connected');
}

async function sendData(type, inputId) {
    if (!vescChar) return;
    const val = document.getElementById(inputId).value;
    const encoder = new TextEncoder();
    await vescChar.writeValue(encoder.encode(`${type}:${val}`));
    document.getElementById(inputId).blur(); // Hides iOS keyboard
}