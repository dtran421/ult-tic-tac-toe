from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from . import model

# Create your views here.


@csrf_exempt
def index(request):
    body = request.body.decode("utf-8")
    print(f"ubsf: {body}")

    with open("debug_log.txt", "a") as debug_log:
        debug_log.write(body + "\n")

    params = body.split("$")
    big_board, board_idx = params[0].split("#"), int(params[1])

    board_idx, cell_idx = model.determine_move(big_board, board_idx)
    print(f"chosen move: ({board_idx}, {cell_idx})")

    return HttpResponse(f"{board_idx}${cell_idx}")
