const container=document.querySelector('.container');
const count=document.getElementById('count');
const amount=document.getElementById('amount');
const select=document.getElementById('movie');
const seats=document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();
//koltuklara event eklenerek seçilebilir olması sağlanır.
container.addEventListener('click',function(e) {
    if(e.target.classList.contains('seat')&& !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected');
        calculateTotal();
       
    }
    
});

//select kutusunda değişiklik yapmak için event eklenir.Her bir sinemadaki farklı fiyatlandırma sağlanarak yazdırılır.
select.addEventListener('change',function (e) {
        calculateTotal();
    
});
function calculateTotal() {
    const selectedSeats=container.querySelectorAll('.seat.selected');

    const selectedSeatsArr=[];
    const seatsArr=[];
    //seçilen koltuklar array listesine eklenir.
    selectedSeats.forEach(function(seat) {
        selectedSeatsArr.push(seat);

    });
    //gezilen her bir koltuk tek tek eklenir.
    seats.forEach(function(seat) {
        seatsArr.push(seat); 
    });
    //Dizideki her bir eleman map metodu ile gezilirIndexler tutulur.[]1,2,3..]
    let selectedSeatIndexs =selectedSeatsArr.map(function(seat) {
        return seatsArr.indexOf(seat);
    });
      
    //seçilen koltuklar alınır.Fiyat bilgisi seçilen koltuk sayısı ile çarpılır ve yazdırılır.
    let selectedSeatCount=selectedSeats.length;
    amount.innerText=selectedSeatCount * select.value;
    count.innerText=selectedSeatCount;
    saveToLocalStorage(selectedSeatIndexs);

}
 //seçilen koltuk bilgilerini local storage kaydetme işlemi
 function saveToLocalStorage(indexs) {
    //seçilen koltuk numarasının listesi tutulur
    localStorage.setItem('selectedSeats',JSON.stringify(indexs));
    //seçilen film index numarasına göre kayıt olması için
    localStorage.setItem('selectedMovieIndex',select.selectedIndex);
}
 //bilgileri alıp uygulamaya dağıtma işlemi 
 function getFromLocalStorage() {
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
   //seçilen bütün koltuk bilgilerine ulaşır ve select classına ekler.
       if(selectedSeats!=null&& selectedSeats.length>0){
           seats.forEach(function (seat,index) {
               if(selectedSeats.indexOf(index)>-1){
                   seat.classList.add('selected');
               }
           });
       }
    const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');
       if(selectedMovieIndex!=null){
           select.selectedIndex=selectedMovieIndex;
       }
}