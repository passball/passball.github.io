// ==UserScript==
// @include http://store.steampowered.com/checkout/*
// @include https://store.steampowered.com/checkout/*
// ==/UserScript==

(function(){

function init() {
	var divs = document.querySelectorAll('.friend_block.disabled');
	if(!divs) return;
	var rbtns = document.querySelectorAll('.friend_block_radio input[disabled]');
	for (var i=0; i < divs.length; i++){
		divs[i].removeClassName('disabled');
		rbtns[i].disabled = false;
	}

	if(window.location.hash && window.location.hash.substr(1,9)=='multisend'){
		var gifts = window.location.hash.substr(11,window.location.hash.lenght);
		gifts = JSON.parse(decodeURIComponent(gifts))
		var el=document.querySelector('.checkout_tab');
		var gids=[], names=[], str='', i=0;
		for(x in gifts){
			gids.push(x);
			names.push(gifts[x]);
			str+='<p>'+gifts[x]+' <span id="giftN'+i+'"></span></p>';
			i++;
		}
		el.innerHTML='<p><b>Send gift to: '+gids.length+'</b></p>'+str+'';

		window.$('email_input').insertAdjacentHTML("afterEnd",
			'<br/><br/>If you want to send gifts to different user, please enter their Email address below (one address per line). Gift will be sent in order. If the quantity of gift is more than address, the remaining gifts will be sent to the last address.<br/><textarea id="emails" rows=3></textarea>'
		);

		var curGift = 0, emails=[];
		window.g_gidGift = gids[0];

		var SubmitGiftDeliveryForm_old = window.SubmitGiftDeliveryForm;
		window.SubmitGiftDeliveryForm = function(){
			if (!window.$('send_via_email').checked)
				return SubmitGiftDeliveryForm_old.apply(this, arguments);

			if (!window.$('emails').value)
				return SubmitGiftDeliveryForm_old.apply(this, arguments);

			emails = window.$('emails').value.split(/\r?\n/);

			if(emails.length){
				window.$('email_input').value = emails[0];
			}

			return SubmitGiftDeliveryForm_old.apply(this, arguments);

		}

		var OnSendGiftSuccess_old = window.OnSendGiftSuccess;
		window.OnSendGiftSuccess = function(){

			window.$('giftN'+curGift).innerHTML='- Отправлен';

			if(window.g_gidGift = gids[++curGift]){
				if(emails.length>1){
					window.$('email_input').value = emails[Math.min(curGift, (emails.length-1))]
				}

				window.SendGift();
			} else {
				OnSendGiftSuccess_old.apply(this, arguments);
			}
		}
	}

}

var state = window.document.readyState;
if((state == 'interactive')||(state == 'complete'))
	init();
else
	window.addEventListener("DOMContentLoaded", init,false);

})();