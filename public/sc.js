(function(){
          var sukses = 0, gagal = 0;
            $(document).on('input', '.uidtext', function () {
                var hitunghasil = $(this).val(),
                lines = hitunghasil.split('\n');
                hitung = lines.length;
                $('.jumlahuid').text(hitung);
            });

            $(document).on('change', '.optionselect', function (e) {
                var nodeoption = $("option:selected", this), nodejsenv = this.value;
                $("[class*='followuid_te'], [class*='follow_username'], [class*='dm_user'], [class*='dm_group'], [class*='auto_dm_artificial_inteligent'], [class*='dm_photo']").removeClass(function (index, className) {
                    return (className.match(/followuid_te|follow_username|dm_user|dm_group|auto_dm_artificial_inteligent|dm_photo/g) || []).join('');
                });
                if (nodejsenv == "followuid_te") {
                    nodeoption.addClass("followuid_te");
                }
                if (nodejsenv == "follow_username") {
                    nodeoption.addClass("follow_username");
                }
                if (nodejsenv == "dm_user") {
                    nodeoption.addClass("dm_user");
                }
                if (nodejsenv == "dm_group") {
                    nodeoption.addClass("dm_group");
                }
                if (nodejsenv == "auto_dm_artificial_inteligent") {
                    nodeoption.addClass("auto_dm_artificial_inteligent");
                }
                if (nodejsenv == "dm_photo") {
                    nodeoption.addClass("dm_photo");
                }
            });

          $('button.mbaros').on('click', ()=>{
                var user = $('input.pengguna').val(), hashmd5 = $('input.sandi').val();
                if (!user || user < 1) {
                    alert('Endi Username ne ?');
                    return false;
                }else if(!hashmd5 || hashmd5 < 1) {
                    alert('Endi Sandi ne ?');
                    return false;
                }
                $.ajax({
                    url : '/login',
                    type: 'get',
                    cache: false,
                    headers: {
                        'content-type': 'applications/json',
                        'accept': 'applications/json'
                    },
                    beforeSend: function(){
                        $('button.mbaros').text('ENTENI SEG');
                        $('.status').text('SEG ENTENI GEK MBAROS').css('color', '#1f87ef');
                    },
                    data: {
                        'username': user,
                        'sandine': hashmd5
                    }
                }).done( (data) =>{
                    postan = data.mediaCount, img_url = data.image, bio = data.biography, uid = data.client.id, followers = data.followerCount, following = data.followingCount, nama = data.fullName, usern_nama = data.username;
                    $('.status').text('ON').css('color', '#28a745');
                    $('button.mbaros').text('SUKSES LOGIN');
                    $('.changelog').val('SAMPEAN SUKSES LOGIN SEBAGAI --> ' + usern_nama + '\n');
                    if(bio === ''){
                        $('.biografi').text('<-------------- BIO KOSONG ---------------->');
                    }else {
                        $('.biografi').text(bio);
                    }
                    $('.pengunnae').text(usern_nama);
                    $('.post_postan').text(postan);
                    $('.pengikut').text(followers);
                    $('.mengikuti').text(following);
                    $('.uid').text(uid);
                    $('.nama_lengkap').text(nama);
                }).fail(()=>{
                    $('.status').text('Gak Connected').css('color', '#dc3545');
                });
          })

          $('button.metu').on('click', function(){
            $.post('/metu', function(sukses){
                if(sukses !== null){
                    window.location.reload();
                }else {
                    $('.status').text('ONO SENG SALAH !').css('color', '#dc3545');
                }
            })
          });

          $('.tamper').on('click', function(){
            var uid = $('.uidtext').val().split('\n'), text_kata = $('.text_kata').val(), img = $('.img').val(), delay = $('.delayed').val(), crals = $('.uidtext').val(), trimmed = $.trim(crals).replace(/\s+/g, ','), buat_chunk = trimmed.split(','), chunk_anu = chunkify(buat_chunk);
            if (!uid || uid < 1) {
                alert('Endi UID e ?');
                return false;
            } else {
                $('.tamper').text('WES MLAKU');
            }
            if (!delay) delay = 1;
            delay = delay * 3000;
            if($('.optionselect').find('.followuid_te').length > 0){
                $.each(uid, function(i, v){
                    var normal = true, op = i == uid.length - 1;
                    setTimeout(function(){
                        if(op){
                            $.ajax({
                                url: '/follow_leng',
                                type: 'get',
                                headers: {
                                    'content-type': 'applications/json',
                                    'accept': 'applications/json'
                                },
                                data: {
                                    'uid': v
                                }
                            }).done(function(data){
                                sukses++;
                                $('.sukses_data').text(sukses);
                                $('.changelog').val('FOLLOW ' + v);
                            }).fail(function(){
                                gagal++;
                                $('.gagal_data').text(gagal);
                            });
                            $('.tamper').text('TAMPER');
                        }else {
                            $.ajax({
                                url: '/follow_leng',
                                type: 'get',
                                headers: {
                                    'content-type': 'applications/json',
                                    'accept': 'applications/json'
                                },
                                data: {
                                    'uid': v
                                }
                            }).done(function(data){
                                sukses++;
                                $('.sukses_data').text(sukses);
                                $('.changelog').val('FOLLOW ' + v);
                            }).fail(function(){
                                gagal++;
                                $('.gagal_data').text(gagal);
                            });
                        }
                    }, (i + 1) * delay);
                    if(op){
                        normal = false;
                        return false;
                    }
                    return normal;
                });
            }else if($('.optionselect').find('.follow_username').length > 0){
                $.each(uid, function(i, v){
                    var normal = true, op = i == uid.length - 1;
                    setTimeout(function(){
                        if(op){
                            $.ajax({
                                url: '/follow_leng',
                                type: 'get',
                                headers: {
                                    'content-type': 'applications/json',
                                    'accept': 'applications/json'
                                },
                                data: {
                                    'uid': v
                                }
                            }).done(function(data){
                                sukses++;
                                $('.sukses_data').text(sukses);
                                $('.changelog').val('FOLLOW ' + v);
                            }).fail(function(){
                                gagal++;
                                $('.gagal_data').text(gagal);
                            });
                            $('.tamper').text('TAMPER');
                        }else {
                            $.ajax({
                                url: '/follow_leng',
                                type: 'get',
                                headers: {
                                    'content-type': 'applications/json',
                                    'accept': 'applications/json'
                                },
                                data: {
                                    'uid': v
                                }
                            }).done(function(data){
                                sukses++;
                                $('.sukses_data').text(sukses);
                                $('.changelog').val('FOLLOW ' + v);
                            }).fail(function(){
                                gagal++;
                                $('.gagal_data').text(gagal);
                            });
                        }
                    }, (i + 1) * delay);
                    if(op){
                        normal = false;
                        return false;
                    }
                    return normal;
                });
            }else if($('.optionselect').find('.dm_user').length > 0){
                $.each(uid, function(i, v){
                    var normal = true, op = i == uid.length - 1;
                    setTimeout(function(){
                        if(op){
                            $.ajax({
                                url: '/dm_asu',
                                type: 'get',
                                headers: {
                                    'content-type': 'applications/json',
                                    'accept': 'applications/json'
                                },
                                data: {
                                    'uid': v,
                                    'words' : text_kata
                                }
                            }).done(function(data){
                                sukses++;
                                $('.sukses_data').text(sukses);
                                $('.changelog').val('DM ' + v);
                            }).fail(function(){
                                gagal++;
                                $('.gagal_data').text(gagal);
                            });
                            $('.tamper').text('TAMPER');
                        }else {
                            $.ajax({
                                url: '/dm_asu',
                                type: 'get',
                                headers: {
                                    'content-type': 'applications/json',
                                    'accept': 'applications/json'
                                },
                                data: {
                                    'uid': v,
                                    'words' : text_kata
                                }
                            }).done(function(data){
                                sukses++;
                                $('.sukses_data').text(sukses);
                                $('.changelog').val('DM ' + v);
                            }).fail(function(){
                                gagal++;
                                $('.gagal_data').text(gagal);
                            });
                        }
                    }, (i + 1) * delay);
                    if(op){
                        normal = false;
                        return false;
                    }
                    return normal;
                });
            }else if($('.optionselect').find('.dm_photo').length > 0){
                $.each(uid, function(i, v){
                    var normal = true, op = i == uid.length - 1;
                    setTimeout(function(){
                        if(op){
                            $.ajax({
                                url: '/dm_photo',
                                type: 'get',
                                headers: {
                                    'content-type': 'applications/json',
                                    'accept': 'applications/json'
                                },
                                data: {
                                    'uid': v,
                                    'img_url' : img
                                }
                            }).done(function(data){
                                sukses++;
                                $('.sukses_data').text(sukses);
                                $('.changelog').val('DM ' + v);
                            }).fail(function(){
                                gagal++;
                                $('.gagal_data').text(gagal);
                            });
                            $('.tamper').text('TAMPER');
                        }else {
                            $.ajax({
                                url: '/dm_photo',
                                type: 'get',
                                headers: {
                                    'content-type': 'applications/json',
                                    'accept': 'applications/json'
                                },
                                data: {
                                    'uid': v,
                                    'img_url' : img
                                }
                            }).done(function(data){
                                sukses++;
                                $('.sukses_data').text(sukses);
                                $('.changelog').val('DM ' + v);
                            }).fail(function(){
                                gagal++;
                                $('.gagal_data').text(gagal);
                            });
                        }
                    }, (i + 1) * delay);
                    if(op){
                        normal = false;
                        return false;
                    }
                    return normal;
                });
            }else {
                alert("TOOLS INI MASIH DALAM PENGEMBANGAN. POK TUKOKNO RHEANK KOPI SEG !!");
                return false;
            }

            function chunkify(array, chunkSize = 15) {
                const chunks = Array.from({
                        length: Math.ceil(array.length / chunkSize)
                    },
                    (_, i) => {
                        const start = chunkSize * i;
                        return array.slice(start, start + chunkSize);
                    }
                );
                return chunks;
            }
          });
      })();
