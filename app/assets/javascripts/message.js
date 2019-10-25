$(function() {
  function buildHTML(message){
    var image = ""
    message.image ? image = `<img class="contents__main__text-box__comment__image" src="${message.image}">` : image = ""

    var html = `<div class="contents__main__text-box">
                  <div class="contents__main__text-box--up">
                    <div class="contents__main__text-box--up__name">
                    ${message.user_name}
                    </div>
                    <div class="contents__main__text-box--up__date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="contents__main__text-box__comment">
                    <p class="contents__main__text-box__comment__text">
                    ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.contents__main').append(html)
      $('.contents__main').animate({scrollTop: $('.contents__main')[0].scrollHeight})
      $('input').prop('disabled', false)
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  })
});