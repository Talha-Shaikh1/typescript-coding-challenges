// Practice 1 — push/pop revision
// names array mein "Bilal" end mein add karo, phir "Ali" ko shuru se remove karo (hint: push + shift). Har step ke baad console.log karke dekho array kaisi dikh rahi hai.

let names: string[] = ["Ali", "Shaikh", "Abdullah"]
console.log(names)
names.push("Bilal")
console.log(names)
names.shift()
console.log(names)

// Practice 2 — filter warm-up
// names array se sirf wo names filter karo jo "A" se start hote hain (hint: .startsWith('A') string method hai).

let nameStartWithA = names.filter(name => name.startsWith("A"))

console.log(nameStartWithA)


// Practice 4 — indexOf vs includes
// flags array mein true pehli baar kis index pe hai, wo nikaalo. Phir check karo false array mein exist karta hai ya nahi — dono alag methods se (jo upar section 7 mein bataye hain).

let flags: boolean[] = [false, true, false, true, true]

console.log(flags.indexOf(true))
console.log(flags.includes(false))


// Practice 5 — SDK filter+map combo
// Socho tumhare paas messageIds: string[] hai jisme kuch IDs "wamid_" se start hote hain aur kuch nahi (jaise ganda data).

// Pehle .filter() se sirf valid (wamid_ wale) IDs nikaalo
// Phir .map() se un IDs ko { id: string, verified: boolean }[] shape mein convert karo (verified hamesha true hoga kyunke already filter kar chuke ho)

type MessageIds = {
    id: string
    verified: boolean
}

let wabaIds: string[] = ["1213", "wamid_1231", "4567", "wamid_4567"]

let validIds: MessageIds[] = wabaIds.filter(id => id.startsWith("wamid_")).map(id => ({
    id: id,
    verified: true
}))

console.log("validIds ",validIds)


// Practice 6 — Bonus (Combine karna)
// cities array lo aur ek function formatCities(cities: string[]) banao jo:

// .filter() se sirf wo cities rakho jinke naam 6 letters se zyada hon
// .map() se unko "City: " + name format mein badlo
// .reduce() se sab ko ek single comma-separated string bana do
// Hint: teeno methods ko chain kar sakte ho: cities.filter(...).map(...).reduce(...).

let cities: string[] = ["Karachi", "Lahore","Delhi", "Hyderabad"]

function formatCities(cities: string[]){
    let formatedCities = cities.
    filter(city => city.length > 6).
    map(city => `City: ${city}`).
    reduce((acc, city) => (
        acc + ", " + city + " "
    ))

    console.log(formatedCities)
    return formatedCities
}

console.log(formatCities(cities))
