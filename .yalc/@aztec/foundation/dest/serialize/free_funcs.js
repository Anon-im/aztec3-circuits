import { toBigIntBE, toBufferBE } from '../bigint-buffer/index.js';
// For serializing bool.
export function boolToByte(b) {
    const buf = Buffer.alloc(1);
    buf.writeUInt8(b ? 1 : 0);
    return buf;
}
// For serializing numbers to 32 bit little-endian form.
export function numToUInt32LE(n, bufferSize = 4) {
    const buf = Buffer.alloc(bufferSize);
    buf.writeUInt32LE(n, bufferSize - 4);
    return buf;
}
// For serializing numbers to 32 bit big-endian form.
export function numToUInt32BE(n, bufferSize = 4) {
    const buf = Buffer.alloc(bufferSize);
    buf.writeUInt32BE(n, bufferSize - 4);
    return buf;
}
// For serializing signed numbers to 32 bit big-endian form.
export function numToInt32BE(n, bufferSize = 4) {
    const buf = Buffer.alloc(bufferSize);
    buf.writeInt32BE(n, bufferSize - 4);
    return buf;
}
// For serializing numbers to 32 bit big-endian form.
export function numToUInt8(n) {
    const bufferSize = 1;
    const buf = Buffer.alloc(bufferSize);
    buf.writeUInt8(n, 0);
    return buf;
}
// For serializing a buffer as a vector.
export function serializeBufferToVector(buf) {
    const lengthBuf = Buffer.alloc(4);
    lengthBuf.writeUInt32BE(buf.length, 0);
    return Buffer.concat([lengthBuf, buf]);
}
export function serializeBigInt(n, width = 32) {
    return toBufferBE(n, width);
}
export function deserializeBigInt(buf, offset = 0, width = 32) {
    return { elem: toBigIntBE(buf.slice(offset, offset + width)), adv: width };
}
export function serializeDate(date) {
    return serializeBigInt(BigInt(date.getTime()), 8);
}
export function deserializeBufferFromVector(vector, offset = 0) {
    const length = vector.readUInt32BE(offset);
    const adv = 4 + length;
    return { elem: vector.slice(offset + 4, offset + adv), adv };
}
export function deserializeBool(buf, offset = 0) {
    const adv = 1;
    return { elem: buf.readUInt8(offset), adv };
}
export function deserializeUInt32(buf, offset = 0) {
    const adv = 4;
    return { elem: buf.readUInt32BE(offset), adv };
}
export function deserializeInt32(buf, offset = 0) {
    const adv = 4;
    return { elem: buf.readInt32BE(offset), adv };
}
export function deserializeField(buf, offset = 0) {
    const adv = 32;
    return { elem: buf.slice(offset, offset + adv), adv };
}
// For serializing an array of fixed length elements.
export function serializeBufferArrayToVector(arr) {
    const lengthBuf = Buffer.alloc(4);
    lengthBuf.writeUInt32BE(arr.length, 0);
    return Buffer.concat([lengthBuf, ...arr]);
}
export function deserializeArrayFromVector(deserialize, vector, offset = 0) {
    let pos = offset;
    const size = vector.readUInt32BE(pos);
    pos += 4;
    const arr = new Array(size);
    for (let i = 0; i < size; ++i) {
        const { elem, adv } = deserialize(vector, pos);
        pos += adv;
        arr[i] = elem;
    }
    return { elem: arr, adv: pos - offset };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJlZV9mdW5jcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJpYWxpemUvZnJlZV9mdW5jcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRW5FLHdCQUF3QjtBQUN4QixNQUFNLFVBQVUsVUFBVSxDQUFDLENBQVU7SUFDbkMsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRCx3REFBd0Q7QUFDeEQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxDQUFTLEVBQUUsVUFBVSxHQUFHLENBQUM7SUFDckQsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckMsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQscURBQXFEO0FBQ3JELE1BQU0sVUFBVSxhQUFhLENBQUMsQ0FBUyxFQUFFLFVBQVUsR0FBRyxDQUFDO0lBQ3JELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELDREQUE0RDtBQUM1RCxNQUFNLFVBQVUsWUFBWSxDQUFDLENBQVMsRUFBRSxVQUFVLEdBQUcsQ0FBQztJQUNwRCxNQUFNLEdBQUcsR0FBRyxNQUFNLENB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