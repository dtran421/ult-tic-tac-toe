from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

# Create your views here.


@csrf_exempt
def index(request):
    body = request.body.decode("utf-8")
    big_board, board_idx = body.split("$")
    big_board = big_board.split("#")

    return HttpResponse("hello world")
