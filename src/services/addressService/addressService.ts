import { Observable, of, Subject, throwError } from "rxjs";
import mockData from "./mockData.json";
import PostcodeAddressSuggestion from "./postcodeAddressSuggestion";

export default class AddressService {

    private readonly GETADDRESS_HOST = "https://api.getAddress.io";
    private readonly UNSAFE_API_KEY = ""; // if they ever send me one

    lookupAddressFromPostcode(postcode: string): Observable<PostcodeAddressSuggestion> {
        const result: Subject<PostcodeAddressSuggestion> = new Subject<PostcodeAddressSuggestion>();
        fetch(`${this.GETADDRESS_HOST}/find/${postcode}?api-key=${this.UNSAFE_API_KEY}&expand=true `, { method: "GET" }).then((response: Response) => {
            if (response.status === 200) {
                response.json().then((body) => {
                    result.next(body);
                    result.complete();
                })
            } else {
                result.error(new Error(`${response.status}`));
                result.complete();
            }
        });
        return result.asObservable();
    }


    mockLookupAddressFromPostcode(postcode: string): Observable<PostcodeAddressSuggestion> {
        const result: Subject<PostcodeAddressSuggestion> = new Subject<PostcodeAddressSuggestion>();
        window.setTimeout(() => {
            if (postcode.toLowerCase() === "abc 123") {
                result.next(mockData)
                result.complete();
            } else {
                result.error(new Error("400"));
                result.complete();
            }
        }, 2000);
        return result.asObservable();
    }


}