import { db } from "./firebase.js";

import {
    collection,
    getDocs
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const table = document.getElementById("responseTable");

async function loadResults(){

    const snapshot = await getDocs(
        collection(db,"results")
    );

    const students = [];

    snapshot.forEach(doc => {

        students.push(doc.data());

    });

    students.sort((a,b) => {

        if((b.score || 0) !== (a.score || 0)){
            return (b.score || 0) - (a.score || 0);
        }

        return (a.completionTime || 999999)
             - (b.completionTime || 999999);

    });

    // Update dashboard cards
    document.getElementById("totalParticipants").innerText =
        students.length;

    document.getElementById("highestScore").innerText =
        students.length > 0
        ? `${students[0].score}/${students[0].totalQuestions}`
        : "0";

    students.forEach((data,index) => {

        const row = table.insertRow();

        const rankCell = row.insertCell(0);

        if(index === 0){
            rankCell.innerText = "🥇";
        }
        else if(index === 1){
            rankCell.innerText = "🥈";
        }
        else if(index === 2){
            rankCell.innerText = "🥉";
        }
        else{
            rankCell.innerText = index + 1;
        }

        row.insertCell(1).innerText =
            data.name || "N/A";

        row.insertCell(2).innerText =
            data.class || "N/A";

        row.insertCell(3).innerText =
            `${data.score || 0}/${data.totalQuestions || 0}`;

        row.insertCell(4).innerText =
            `${data.completionTime || 0} sec`;

        row.insertCell(5).innerText =
            data.submittedAt
            ? new Date(data.submittedAt).toLocaleString()
            : "N/A";

    });

}

loadResults();