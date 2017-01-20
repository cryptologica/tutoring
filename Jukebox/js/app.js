// Code in here will only run once the DOM has loaded
$(document).ready(function() {

	var Jukebox = {
		currentSong: 1, // Default to song #1
		maxIndex: 2,
		play: function(index) {
			if (index == 0) {
				index = Jukebox.currentSong;
			}
			var song = $("div[song=" + index + "] > audio").get(0);
			song.play();
			setControlActive("play");
		},
		pause: function(index) {
			if (index == 0) {
				index = Jukebox.currentSong;
			}
			var song = $("div[song=" + index + "] > audio").get(0);
			song.pause();
			setControlActive("pause");
		},
		stop: function(index) {
			if (index == 0) {
				index = Jukebox.currentSong;
			}
			var song = $("div[song=" + index + "] > audio").get(0);
			song.pause();
			song.currentTime = 0;
			setControlActive("stop");
		},
		load: function(url) {
			// TODO: load a song
			Jukebox.maxIndex++;
			console.log(Jukebox.maxIndex);
			var title = $('#inputTitle').val();
			var content = '<div song="'+ Jukebox.maxIndex +'"> <p>'+ title +'</p> <audio> <source src="'+ url +'" type="audio/mp3"> </audio> </div>';
			$('.songs').append(content);
		}
	}



	/* Event Listeners */

	// User clicked on a song title
	$(document.body).on('click', "div[song]", function() {
		// Stop current song
		Jukebox.stop(Jukebox.currentSong);
		// Get song index that was clicked
		var index = $(this).attr('song');
		// Play that song
		Jukebox.play(index);
		// Update current song
		Jukebox.currentSong = index;
		console.log("clicked " + $(this).find('p').text());
	});

	// User clicked on Play Button
	$("#playBtn").on('click', function() {
		Jukebox.play(0);
	});

	// User clicked on Pause Button
	$("#pauseBtn").on('click', function() {
		Jukebox.pause(0);
	});

	// User clicked on Stop Button
	$("#stopBtn").on('click', function() {
		Jukebox.stop(0);
	});

	// User clicked on Add Song Button
	$("#addSongBtn").on('click', function() {
		var url = $("#inputURL").val();
		Jukebox.load(url);
	});


	/* Helper Functions */

	// Colors background of given control (play/pause/stop)
	function setControlActive(name) {
		// Reset all to default
		$('#playBtn').css("background-color", "white");
		$('#pauseBtn').css("background-color", "white");
		$('#stopBtn').css("background-color", "white");

		switch (name) {
			case "play":
				$('#playBtn').css("background-color", "green");
				break;
			case "pause":
				$('#pauseBtn').css("background-color", "yellow");
				break;
			case "stop":
				$('#stopBtn').css("background-color", "red");
				break;
			default:
				console.log("invalid control name");
				break;
		}
	}

}); // End document.ready()



