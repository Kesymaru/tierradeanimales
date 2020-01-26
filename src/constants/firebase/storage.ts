import Firebase from "./firebase";
import * as firebase from "firebase";

class Storage extends Firebase {
    private static Ref(name: string): firebase.storage.Reference {
        return Storage.storage.ref(name);
    }

    public static Save(id: string, file: File, name: string = ""): Promise<firebase.storage.UploadTaskSnapshot> {
        if(name === "" && file.name) name = file.name;
        let ref = Storage.Ref(name).child(`${id}/${name}`);

        return ref.put(file)
            .then(snapshot => snapshot);
    }

    public static SaveAndDownload(id: string, file: File, name: string = ""): Promise<string> {
        return Storage.Save(id, file, name)
            .then(snapshot => snapshot.ref.getDownloadURL())
    }
}

export default Storage;
